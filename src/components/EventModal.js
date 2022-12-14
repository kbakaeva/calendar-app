import React from "react";
import GlobalContext from "../context/GlobalContext";
import deleteImg from "../assets/delete.svg";
import closeImg from "../assets/close.svg";
import dragImg from "../assets/drag-handle.svg";
import scheduleImg from "../assets/schedule.svg";
import textImg from "../assets/text.svg";
import bookmarkImg from "../assets/bookmark.svg";
import checkImg from "../assets/done.svg";

const labelsClasses = [
  "indigo",
  "black",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCallEvent,
    selectedEvent,
  } = React.useContext(GlobalContext);

  const [title, setTitle] = React.useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = React.useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = React.useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCallEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCallEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <img src={dragImg} alt="create_event" className="w-7 h-7" />
          <div>
            {selectedEvent && (
              <button onClick={() => {
                dispatchCallEvent({
                  type: "delete",
                  payload: selectedEvent,
                });
                setShowEventModal(false);
              }}>
                <img src={deleteImg} alt="create_event" className="w-7 h-7" />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <img src={closeImg} alt="create_event" className="w-7 h-7" />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <img src={scheduleImg} alt="create_event" className="w-7 h-7" />
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <img src={textImg} alt="create_event" className="w-7 h-7" />

            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <img src={bookmarkImg} alt="create_event" className="w-7 h-7" />
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <img src={checkImg} alt="create_event" className="w-7 h-7" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
