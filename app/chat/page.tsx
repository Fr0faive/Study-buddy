export default function Chat() {
  return (
    <div className="flex flex-col gap-4 h-screen">
      <h1>Chatbot</h1>
      <div className="overflow-y-auto flex items-end flex-col gap-6 h-[447px]">
        <div className="flex flex-row-reverse items-center gap-2">
          <div className="flex items-center">
            <img
              src="https://source.unsplash.com/random/200×200"
              alt=""
              className="overflow-hidden h-10 w-14 rounded-full"
            />
          </div>
          <p className="text-xs p-3 bg-[#00707E] rounded-md text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            debitis.
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center">
            <img
              src="https://source.unsplash.com/random/200×200"
              alt=""
              className="overflow-hidden h-10 w-14 rounded-full"
            />
          </div>
          <p className="text-xs p-3 bg-[#00707E] rounded-md text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            debitis.
          </p>
        </div>
        <span>halo2</span>
        <span>halo3</span>
      </div>
      <input
        type="text"
        className="w-full border border-[#00434C] rounded-full px-4 py-2 "
        placeholder="Type your message"
      />
    </div>
  );
}
