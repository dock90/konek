interface GraphQLError {
  networkError?: {
    result: {
      errors: Array<{
        message: string;
      }>;
    };
  };
}

export function getError(e: GraphQLError): string | null {
  if (
    !e.networkError ||
    !e.networkError.result ||
    !e.networkError.result.errors ||
    e.networkError.result.errors.length == 0
  ) {
    return null;
  }

  return e.networkError.result.errors.map((e) => e.message).join('\n');
}
