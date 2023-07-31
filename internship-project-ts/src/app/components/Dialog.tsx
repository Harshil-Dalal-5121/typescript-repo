import React, { forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  SlideProps,
} from "@mui/material";

const Transition = forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogBoxProps {
  type: string;
  id?: number;
  open: boolean;
  handleCancel: () => void;
  handleClose: () => void;
  onClick: () => void;
}

const DialogBox = ({
  type,
  id,
  open,
  handleCancel,
  handleClose,
  onClick,
}: DialogBoxProps) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-describedby="responsive-alert-dialog-slide-description"
      >
        <DialogTitle>{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {type === "Delete"
              ? "This data will be deleted"
              : "This data will be saved"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={onClick}
            variant="contained"
            color={type === "Delete" ? "error" : "success"}
          >
            {type === "Delete" ? "Delete" : id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogBox;
