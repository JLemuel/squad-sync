import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Group, Student } from '../types';
import { getRandomAvatarUrl } from '../utils/avatar';
import { produce } from 'immer';

interface AppState {
  groups: Group[];
  students: Student[];
  showTeams: boolean;
  isShuffling: boolean;
  triggerConfetti: boolean;
  setGroups: (groups: Group[]) => void;
  setStudents: (students: Student[]) => void;
  setShowTeams: (show: boolean) => void;
  setIsShuffling: (isShuffling: boolean) => void;
  setTriggerConfetti: (trigger: boolean) => void;
  handleCreateGroups: (newGroups: Group[]) => void;
  handleResetGroups: () => void;
  handleAddStudent: (name: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const initialStudents: Student[] = [
  // { id: 1, name: 'Alice Johnson', avatarUrl: getRandomAvatarUrl() },
  // { id: 2, name: 'Bob Smith', avatarUrl: getRandomAvatarUrl() },
  // { id: 3, name: 'Charlie Brown', avatarUrl: getRandomAvatarUrl() },
  // { id: 4, name: 'Diana Ross', avatarUrl: getRandomAvatarUrl() },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      groups: [],
      students: initialStudents,
      showTeams: false,
      isShuffling: false,
      triggerConfetti: false,
      setGroups: (groups) => set({ groups }),
      setStudents: (students) => set({ students }),
      setShowTeams: (show) => set({ showTeams: show }),
      setIsShuffling: (isShuffling) => set({ isShuffling }),
      setTriggerConfetti: (trigger) => set({ triggerConfetti: trigger }),
      handleCreateGroups: (newGroups) => {
        set({
          groups: newGroups,
          showTeams: true,
          triggerConfetti: true,
        });
      },
      handleResetGroups: () => {
        set({
          groups: [],
          showTeams: false,
          isShuffling: false,
          triggerConfetti: false,
        });
      },
      handleAddStudent: (name: string) => {
        set(produce((state) => {
          const newStudent: Student = {
            id: state.students.length + 1,
            name,
            avatarUrl: getRandomAvatarUrl(),
          };
          state.students.push(newStudent);
        }));
      },
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'team-shuffle-storage',
      partialize: (state) => ({ students: state.students }),
    }
  )
);
