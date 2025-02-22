const Loading: React.FC = () => {
  return (
    <div className="absolute w-1/5 h-1/">
      <div className="attendance">
        <p className="title">ATTENDANCE</p>
        <div className="attendance-bar">
          <div className="attendance-level">
            <div className="bar-1"></div>
            <div className="bar-2"></div>
            <div className="bar-3"></div>
            <div className="bar-4"></div>
            <div className="bar-5"></div>
            <div className="bar-6"></div>
            <div className="bar-7"></div>
            <div className="bar-8"></div>
            <div className="bar-9"></div>
          </div>
          <div className="attendance-cage-css"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
