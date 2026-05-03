import "./Repository-header.css"

import { BranchDropdown } from "./BranchDropdown";

type RepositoryHeaderProps = {
    repository: {
        name: string;
        username: string;
        branches: string[];
        currentBranch: string;
        setCurrentBranch: React.Dispatch<React.SetStateAction<string>>
    }
}

export function RepositoryHeader({ repository }: RepositoryHeaderProps) {

    return (
        <div className="repo-header">
            <div className="repo-header-item">
                <div className="repo-header-icon"></div>
                <div className="repo-header-title">
                    <span className="repo-header-span-username">
                        <a href="#" className="repo-header-link-username">{repository.username}</a>
                    </span>
                    <span className="repo-header-span-repo-name">
                        /{repository.name}
                    </span>
                </div>

            </div>

            <div className="repo-header-item">
                <div className="repo-header-right">
                    <BranchDropdown branches={repository.branches} setCurrentBranch={repository.setCurrentBranch} currentBranch={repository.currentBranch} />
                    <button className="repo-header-button">Download</button>
                </div>
            </div>
        </div>
    );
}