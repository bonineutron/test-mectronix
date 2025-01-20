export const validateWidthInputs = (screenWidth: number, fullWidth?: boolean, customWidth?: string): string => {
   // Return the custom width if provided.
   if (customWidth) {
      return customWidth;
   }

   // Return full width if fullWidth is set to true.
   if (fullWidth) {
      return '100%';
   }

   // Use full width for screens smaller or equal to 768px.
   if (screenWidth <= 768) {
      return '100%';
   }

   // IMPORTANT: If use flex, you have add gap of 2% in the container of inpunts.
   // Use 49% width for screens smaller or equal to 1280px.
   if (screenWidth <= 1280) {
      return '49%';
   }

   // Use 32% width for larger screens by default.
   return '32%';
};

export function inputChange<T, K>(setState: React.Dispatch<React.SetStateAction<T>>, key: keyof T, value: K) {
   setState((prevForm: T) => ({
      ...prevForm,
      [key]: {
         value,
         error: false,
         errorMessage: ''
      }
   }));
}

export function inputError<T>(setState: React.Dispatch<React.SetStateAction<T>>, key: keyof T, errorMessage?: string) {
   setState((prevForm: T) => ({
      ...prevForm,
      [key]: {
         ...prevForm[key],
         error: true,
         errorMessage: errorMessage
      }
   }));
}

export function validateEmail(email: string): boolean {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   return emailRegex.test(email);
}
