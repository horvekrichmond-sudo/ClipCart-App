import * as React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface CategoryBarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryBar = ({ selectedCategory, onSelectCategory }: CategoryBarProps) => {
  return (
    <div className="sticky top-0 z-30 w-full bg-white dark:bg-yt-dark/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center">
        <div className="flex overflow-x-auto scrollbar-hide px-4 md:px-6 py-4 gap-3 flex-grow snap-x scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 font-heading snap-start flex items-center ${
                  isActive
                    ? 'bg-yt-textLight dark:bg-yt-textDark text-yt-light dark:text-yt-dark shadow-md'
                    : 'bg-zinc-100/80 dark:bg-zinc-900/80 text-yt-textLight dark:text-yt-textDark hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;