variable "gcp_project" {
  description = "GCP Project"
}

variable "gcp_region" {
  description = "GCP Region"
}

variable "gcp_zone" {
  description = "GCP Region"
}

variable "gcp_credentials" {
  description = "GCP credentials path"
}

variable "gke_cluster" {
  description = "GKE cluster name"
}
variable "gke_account" {
  description = "GKE service account"
}
variable "machine_type" {
  description = "GKE cluster machine type"
}