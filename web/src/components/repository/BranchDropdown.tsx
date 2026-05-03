import { useState } from "react";

import "./BranchDropdown.css";

type BranchDropdownProps = {
    branches: string[];
    setCurrentBranch: React.Dispatch<React.SetStateAction<string>>;
    currentBranch: string;
}

export function BranchDropdown({ branches, setCurrentBranch, currentBranch }: BranchDropdownProps) {
    const [branchOpen, setBranchOpen] = useState(false);

    function selectBranch(b: string) {
        setCurrentBranch(b);
        setBranchOpen(false);
    }

    return (
        <div className="repo-header-branch">
            <div
                className="repo-header-branch-label"
                onClick={() => setBranchOpen((s) => !s)}
                aria-expanded={branchOpen}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setBranchOpen((s) => !s); }}
            >
                Branch: {currentBranch}
            </div>

            {branchOpen && (
                <div className="repo-header-branch-dropdown" role="menu">
                    {branches.map((b) => (
                        <div
                            key={b}
                            className={"repo-header-branch-item" + (b === currentBranch ? " active" : "")}
                            onClick={() => selectBranch(b)}
                            onKeyDown={(e) => { if (e.key === "Enter") selectBranch(b); }}
                            role="menuitem"
                            tabIndex={0}
                        >
                            {b}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};