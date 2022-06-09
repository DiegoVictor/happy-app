import { act } from '@testing-library/react-native';

async function wait<T>(expectation: () => T): Promise<T> {
  const startTime = Date.now();

  return await act(async (): Promise<T> => {
    return new Promise((resolve, reject) => {
      const rejectOrRerun = (error: Error) => {
        if (Date.now() - startTime >= 4500) {
          reject(error);
          return;
        }
        setTimeout(runExpectation, 50);
      };
      function runExpectation() {
        try {
          const result = expectation();
          resolve(result);
        } catch (error) {
          rejectOrRerun(error as Error);
        }
      }
      setTimeout(runExpectation, 0);
    });
  });
}

export default wait;
