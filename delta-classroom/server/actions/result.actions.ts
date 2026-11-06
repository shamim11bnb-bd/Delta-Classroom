'use server';

export async function getResultAction(resultId: string) {
  return { id: resultId, score: 95 };
}
