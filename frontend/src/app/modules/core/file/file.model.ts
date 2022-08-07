export default interface AzureBlobFileModel {
  originUrl: string;
  fileUrl: string;
  filename: string;
  sas: string;
  uploadContainer: string;
}
