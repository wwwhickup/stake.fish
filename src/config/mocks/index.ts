const mockEnv = {
  'app.version': '0.1.0',
};

export const configServiceMockFactory = () => {
  return { get: (key) => mockEnv[key] };
};
