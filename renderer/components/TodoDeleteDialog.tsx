import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  openDialog: boolean;
  idToDelete: string;
  setOpenDialog: (value: boolean) => void;
  handleRefresh: () => void;
};
export default function DeleteDialog({
  openDialog,
  idToDelete,
  setOpenDialog,
  handleRefresh,
}: Props) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    global.ipcRenderer.invoke('formDelete', id);
    global.ipcRenderer.on('deleteComplete', () => {
      handleRefresh();
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Simple warning like "Are you sure?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(idToDelete)}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
