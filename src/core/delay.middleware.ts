async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, +ms));
}

export const delayMiddleware = async (req: any, res: any, next: any) => {
  const delay = req?.headers?.delay;
  if (delay) {
    await sleep(delay);
  }
  next();
};
