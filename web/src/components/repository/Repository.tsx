import { useEffect, useState } from "react";
import { RepositoryHeader } from "./Repository-header";
import "./Repository.css";

export function Repository() {
    const [currentBranch, setCurrentBranch] = useState("Main");
    const repository = {
        name: "repository",
        username: "Username",
        branches: ["Main", "Dev", "Feature-1", "Feature-2"],
        currentBranch: currentBranch,
        setCurrentBranch: setCurrentBranch,
    };

    useEffect(() => {
        console.log("Current branch:", currentBranch);
    }, [currentBranch]);

    return (
        <>
            <RepositoryHeader repository={repository} />

            <div className="repo-body">
            </div>

            <div className="repo-footer">

            </div>
        </>
    );
}