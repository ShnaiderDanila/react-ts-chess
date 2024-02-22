import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";

interface PopupProps {
  popupIsOpen: boolean;
  setPopupIsOpen: (arg: boolean) => void;
  restart: () => void;
  popupText: string;
}

const Popup: FC<PopupProps> = ({ popupIsOpen, setPopupIsOpen, restart, popupText }) => {
  const handleClose = () => {
    setPopupIsOpen(false);
  };

  const handleAgree = () => {
    restart();
    handleClose();
  };

  return (
    <Dialog
      open={popupIsOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
        {"Игра окончена"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ textAlign: "center" }}>
          {popupText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleAgree} autoFocus>
          ПЕРЕЗАПУСТИТЬ
        </Button>
        <Button onClick={handleClose}>ВЫЙТИ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
