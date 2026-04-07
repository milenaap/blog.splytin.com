import Swal from "sweetalert2";
 
/* USE:    
const handleError = () => {
    showErrorAlert("Ocurrió un error inesperado");
};

const handleConfirm = async () => {
    const confirmed = await showConfirmDialog("¿Seguro que quieres continuar?");
    if (confirmed) {
      showSuccessAlert("Acción confirmada");
    }
};
*/

export const showSuccessAlert = (message) => {
  Swal.fire({
    title: "¡Éxito!",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const showErrorAlert = (message) => {
  Swal.fire({
    title: "¡Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

export const showConfirmDialog = async (message) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
};
