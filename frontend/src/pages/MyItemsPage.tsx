// MyItemsPage.tsx
import React from 'react';
import Navigation from '../components/Navigation';
import OwnedObjects from '../components/OwnedObjects';

const MyItemsPage: React.FC = () => {
  return (
    <div>
      <Navigation />
      <OwnedObjects />
    </div>
  );
};
export default MyItemsPage;
