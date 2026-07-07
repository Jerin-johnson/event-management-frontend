import Card from "../Card/Card";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";

function EventForm() {
  return (
    <Card>
      <h2>Create Event</h2>

      <Input label="Profiles" placeholder="Select Profiles" />

      <Select
        label="Timezone"
        options={[
          {
            label: "Asia/Kolkata",
            value: "Asia/Kolkata",
          },
        ]}
      />

      <Input type="datetime-local" label="Start" />

      <Input type="datetime-local" label="End" />

      <Button>Create Event</Button>
    </Card>
  );
}

export default EventForm;
