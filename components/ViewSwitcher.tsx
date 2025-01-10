import { Dispatch, SetStateAction } from 'react';

interface ViewSwitcherProps {
  currentView: string;
  setCurrentView: Dispatch<SetStateAction<string>>;
}

export default function ViewSwitcher({ currentView, setCurrentView }: ViewSwitcherProps) {
  const views = ['Day', 'Week', 'Month', 'Year'];

  return (
    <div className="flex items-center space-x-2">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => setCurrentView(view.toLowerCase())}
          className={`px-4 py-2 rounded-lg ${
            currentView === view.toLowerCase()
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          } hover:bg-blue-300`}
        >
          {view}
        </button>
      ))}
    </div>
  );
}
