import "./Containers.css";


type ContainerProps = {
    children: React.ReactNode;
};

export function TwoSplitContainer({ children }: ContainerProps) {
    return <div className="two-split-container">{children}</div>;
}

export function FullWidthContainer({ children }: ContainerProps) {
    return <div className="full-width-container">{children}</div>;
}
export function CenteredHalfWidthContainer({ children }: ContainerProps) {
    return <div className="centered-half-width-container">{children}</div>
}