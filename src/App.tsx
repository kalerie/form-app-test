import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import { isEmail } from "./util/validation";
import AgePicker from "./components/AgePicker";
import PhotoSelect from "./components/PhotoSelect";
import MyDatePicker from "./components/MyDatePicker";

function App() {
  const [emailHasError, setEmailHasError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateData = (data: Date | null) => {
    setSelectedDate(data);
  };

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const requestData = {
      ...data,
      date: selectedDate,
    };

    if (!data.email || !isEmail(data.email as string)) {
      setEmailHasError(true);
      return;
    } else {
      setEmailHasError(false);
    }

    try {
      const response = await fetch("https://api-endpoint.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Submit", requestData);
  }

  const btnClasses =
    "px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-200 hover:bg-stone-600 hover:text-stone-100";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[426px] mx-auto py-[200px] font-[Inter] text-[#000853]"
      >
        <h1 className="text-2xl font-medium mb-[32px]">Personal info</h1>
        <div className="flex flex-col gap-[24px] mb-[48px]">
          <Input label="First Name" id="firstName" name="firstName" required />
          <Input label="Last Name" id="lastName" name="lastName" required />
          <Input
            label="Email Address"
            id="email"
            name="email"
            error={
              (emailHasError &&
                "Please use correct formatting. Example: address@email.com") as string
            }
          />
          <AgePicker id="age" name="age" type="range" min="8" max="99" />
          <PhotoSelect label="Photo" type="file" id="photo" name="photo" />
        </div>

        <div className="mb-[48px]">
          <h1 className="text-2xl font-medium mb-[32px]">Your workout</h1>
          <MyDatePicker data={selectedDate} onDateChange={handleDateData} />
        </div>

        <button className={btnClasses}>Send Application</button>
      </form>
    </>
  );
}

export default App;
