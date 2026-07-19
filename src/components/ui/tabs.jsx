
export const Tabs = ({ children }) => <div>{children}</div>;
export const TabsList = ({ children }) => <div>{children}</div>;
export const TabsTrigger = ({ children, ...props }) => <button {...props}>{children}</button>;
export const TabsContent = ({ children }) => <div>{children}</div>;

export default Tabs;
