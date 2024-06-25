declare module './utils' {
    export function parseCSV(file: File): Promise<any>;
    export function uploadCSVToFirebase(file: File, path: string): Promise<void>;
  }
  
  declare module './DisplayData' {
    export const DisplayData: (props: { path: string }) => JSX.Element;
  }
  