import './Repository.css';
import {
  Divider,
} from '@mui/material';

import RepositoryHeader from './RepositoryHeader';
import RepositoryBody from './RepositoryBody';
import RepositorySidebar from './RepositorySidebar';
import type { RepositoryBodyData } from './RepositoryModel';

const data: RepositoryBodyData = {
  hasReadme: false
};

export default function Repository() {
  return (
    <div className="repository-container">
      <div className="repository-window">
        <RepositoryHeader/>
        <Divider />
        <RepositoryBody data={data} />
      </div>

      <RepositorySidebar/>
    </div>
  );
}