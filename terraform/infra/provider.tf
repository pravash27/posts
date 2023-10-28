provider "google" {
  project = var.gcp_project
  region = var.gcp_region
  credentials = var.gcp_credentials
}

terraform {
  cloud {
    organization = "prsharma"

    workspaces {
      name = "posts-workspace"
    }
  }
}