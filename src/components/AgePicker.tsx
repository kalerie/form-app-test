import { useState, useRef, useEffect } from "react";

export default function AgePicker({ ...props }) {
  const [age, setAge] = useState(25);
  const [position, setPosition] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const thumbWidth = 20;
      const min = Number(slider.min);
      const max = Number(slider.max);

      const percent = ((age - min) / (max - min)) * 100;

      const sliderRect = slider.getBoundingClientRect();
      const newX = (percent / 100) * sliderRect.width;

      setPosition(newX - thumbWidth / 2);
    }
  }, [age]);

  const handleChange = (e) => {
    setAge(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2 h-[130px]">
      <label htmlFor="age" className="text-base font-normal">
        Age
      </label>

      <div className="relative">
        <input
          ref={sliderRef}
          {...props}
          value={age}
          onChange={handleChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none"
        />

        <div
          className="absolute top-8 bg-purple-600 text-white text-sm px-3 py-1 rounded-md font-semibold transition-all"
          style={{
            left: `${position}px`,
          }}
        >
          {age}
        </div>
      </div>
    </div>
  );
}
