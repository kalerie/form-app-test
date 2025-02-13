export default function PhotoSelect({ label, ...props }) {
  return (
    <div className="col-span-full">
      <label htmlFor="cover-photo" className="text-base font-normal">
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-[#CBB6E5] bg-white px-6 py-10">
        <label
          htmlFor={props.id}
          className="relative cursor-pointer text-[#761BE4] underline font-normal"
        >
          <span>Upload a file</span>
          <input {...props} className="sr-only" />
        </label>
        <p className="pl-1">or drag and drop here</p>
      </div>
    </div>
  );
}
