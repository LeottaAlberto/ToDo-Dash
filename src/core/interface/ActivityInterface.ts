import type CategoryInterface from './CategoryInterface';
import type FilterInterface from './FilterInterface';

export default interface ActivityInterface {
  id: string;
  categories: CategoryInterface[];
  priority: string;
  title: string;
  duration: number;
  note: string;
  status: boolean;
  filters: FilterInterface[];
}
