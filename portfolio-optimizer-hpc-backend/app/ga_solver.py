import random
import numpy as np
from dask import delayed, compute
from dask.distributed import Client
from app.portfolio import Portfolio


def initialize_population(pop_size, num_assets):
    population = []
    for _ in range(pop_size):
        individual = np.random.dirichlet(np.ones(num_assets))
        population.append(individual)
    return population


# def evaluate_fitness(individual, returns, risk_free_rate):
#     portfolio = Portfolio(individual, returns)
#     sharpe_ratio = portfolio.sharpe_ratio(risk_free_rate)
#     return sharpe_ratio

def evaluate_fitness(individual, returns, risk_free_rate, target_return=0.0):
    portfolio = Portfolio(individual, returns)
    sortino_ratio = portfolio.sortino_ratio(risk_free_rate, target_return)
    return sortino_ratio


def tournament_selection(population, fitness_scores, selection_size, tournament_size):
    selected_individuals = []
    for _ in range(selection_size):
        tournament_indices = random.sample(
            range(len(population)), tournament_size)
        best_index = max(tournament_indices, key=lambda i: fitness_scores[i])
        selected_individuals.append(population[best_index])
    return selected_individuals


def crossover(parent1, parent2):
    crossover_point = random.randint(1, len(parent1) - 1)
    child1 = np.concatenate(
        (parent1[:crossover_point], parent2[crossover_point:]))
    child2 = np.concatenate(
        (parent2[:crossover_point], parent1[crossover_point:]))

    child1 /= np.sum(child1)
    child2 /= np.sum(child2)

    return child1, child2


def mutation(individual, mutation_rate):
    for i in range(len(individual)):
        if random.random() < mutation_rate:
            mutation_amount = random.uniform(-0.1, 0.1)
            individual[i] += mutation_amount
            individual = np.clip(individual, 0, 1)
            individual /= np.sum(individual)
    return individual


def elitism(population, fitness_scores, elite_size):
    elite_indices = np.argsort(fitness_scores)[-elite_size:]
    return [population[i] for i in elite_indices]


def adaptive_mutation_rate(generation, num_generations, initial_rate=0.1, final_rate=0.01):
    return initial_rate * (1 - generation / num_generations) + final_rate * (generation / num_generations)


def ga_solver(returns, pop_size, num_generations, risk_free_rate=0.02, elite_size=1):
    num_assets = returns.shape[1]
    population = initialize_population(pop_size, num_assets)

    for generation in range(num_generations):
        fitness_scores = [delayed(evaluate_fitness)(
            ind, returns, risk_free_rate) for ind in population]
        fitness_scores = compute(*fitness_scores)

        selected_individuals = tournament_selection(
            population, fitness_scores, pop_size // 2, tournament_size=4)

        next_gen_futures = []
        mutation_rate = adaptive_mutation_rate(
            generation, num_generations, initial_rate=0.1, final_rate=0.1)
        for _ in range(pop_size // 2):
            parent1 = random.choice(selected_individuals)
            parent2 = random.choice(selected_individuals)
            child1, child2 = crossover(parent1, parent2)
            child1 = delayed(mutation)(child1, mutation_rate)
            child2 = delayed(mutation)(child2, mutation_rate)
            next_gen_futures.extend([child1, child2])

        next_gen = list(compute(*next_gen_futures))

        elite_individuals = elitism(population, fitness_scores, elite_size)
        next_gen.extend(elite_individuals)
        population = next_gen

    best_fitness_index = np.argmax(fitness_scores)
    best_individual = population[best_fitness_index]
    best_fitness = fitness_scores[best_fitness_index]

    return best_individual, best_fitness


# Here is the content of portfolio.py


class Portfolio:
    def __init__(self, weights, returns):
        self.weights = np.array(weights)
        self.returns = np.array(returns)

    def expected_return(self):
        return np.sum(self.returns.mean(axis=0) * self.weights)

    def risk(self):
        cov_matrix = np.cov(self.returns.T)
        return np.sqrt(np.dot(self.weights.T, np.dot(cov_matrix, self.weights)))

    # def sharpe_ratio(self, risk_free_rate=0.02):
    #     return (self.expected_return() - risk_free_rate) / self.risk()

    def sortino_ratio(self, risk_free_rate, target_return):
        excess_return = self.expected_return() - risk_free_rate
        downside_risk = np.sqrt(
            np.mean(np.minimum(self.returns - target_return, 0.0) ** 2))

        if downside_risk == 0:
            return 0.0

        sortino_ratio = excess_return / downside_risk
        return sortino_ratio
