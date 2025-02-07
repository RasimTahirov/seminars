import { ISeminar } from '../types/type';

interface SeminarViewProps {
  seminar: ISeminar;
}

const SeminarView: React.FC<SeminarViewProps> = ({ seminar }) => {
  return (
    <>
      <div className="mb-2.5">
        <img className="object-cover rounded-xl" src={seminar.photo} alt={seminar.time} />
      </div>
      <div className="flex items-center justify-between font-medium">
        <h2 className="title">{seminar.title}</h2>
        <div className="flex gap-x-1.5">
          <div>{seminar.date}</div>
          <div>{seminar.time}</div>
        </div>
      </div>
      <p>{seminar.description}</p>
    </>
  );
};

export default SeminarView;
