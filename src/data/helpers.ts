type GeneratedId = () => string;
export const generatedId: GeneratedId = (): any => {
  Math.random().toString(16) + new Date().getTime().toString(36);
};
