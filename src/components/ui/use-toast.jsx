
export const useToast = () => {
  return {
    toast: (opts) => console.log('toast', opts),
  };
};

export default useToast;
