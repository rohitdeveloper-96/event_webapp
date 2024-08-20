import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
const CreateDialog = ({
  onClose,
  openModel,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <>
      <Modal
        open={openModel}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <h3>Create Event</h3>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Name"
              {...register("name", {
                required: "Username is required",
              })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="EventName"
              label="EventName"
              {...register("eventname", {
                required: "event name is required",
              })}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="primaryskills"
              label="PrimarySkills"
              {...register("primaryskills", {
                required: "primary skills is required",
              })}
            />
            {errors.username && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errors.username.message}
              </p>
            )}
            {errors.email && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errors.email.message}
              </p>
            )}
            {errors.eventname && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errors.eventname.message}
              </p>
            )}
            {errors.eventname && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errors.eventname.message}
              </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </form>
        </Sheet>
      </Modal>
    </>
  );
};
export default CreateDialog;
