from app.ga_solver import ga_solver


def lambda_handler(event, context):
    # Extract necessary input data from the event
    returns = event['returns']
    pop_size = event['pop_size']
    num_generations = event['num_generations']
    risk_free_rate = event['risk_free_rate']

    # Call the ga_solver function with the appropriate arguments
    best_individual, best_fitness = ga_solver(
        returns, pop_size, num_generations, risk_free_rate)

    # Return the result in the required format
    return {
        'statusCode': 200,
        'body': {
            'best_individual': best_individual.tolist(),
            'best_fitness': best_fitness
        }
    }
