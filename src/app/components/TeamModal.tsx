import { Group, Student } from '../types';

interface TeamModalProps {
  group: Group;
  students: Student[];
  onClose: () => void;
}

const TeamModal: React.FC<TeamModalProps> = ({ group, students, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card rounded-[var(--radius)] p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-primary">{group.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {group.members.map((memberName, index) => {
            const student = students.find(s => s.name === memberName);
            return (
              <div key={index} className="flex items-center space-x-4 bg-muted p-4 rounded-[calc(var(--radius)-0.25rem)]">
                <img
                  src={student?.avatarUrl}
                  alt={memberName}
                  className="w-16 h-16 rounded-full border-3 border-primary"
                />
                <div>
                  <p className="font-semibold text-lg">{memberName}</p>
                  {/* Add more student details here if needed */}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-primary text-primary-foreground py-3 px-6 rounded-[var(--radius)] hover:bg-primary/90 transition-colors duration-200 text-lg font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TeamModal;
