import * as React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface CategoryBarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryBar = ({ selectedCategory, onSelectCategory }: CategoryBarProps) => {
  return (
    <div className="sticky top-0 z-30 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-yt-dark transition-colors duration-300">
      <div className="flex items-center">
        <div className="flex overflow-x-auto scrollbar-hide px-4 md:px-6 py-3 gap-3 flex-grow snap-x scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const isEndingSoon = cat.includes('Ending Soon');
            
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 font-heading snap-start flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-yt-textLight dark:bg-yt-textDark text-yt-light dark:text-yt-dark'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-yt-textLight dark:text-yt-textDark border border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {isEndingSoon ? (
                  <>
                    <span className="text-accent">⚡</span>
                    <span>Ending soon</span>
                  </>
                ) : cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;