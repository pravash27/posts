resource "google_service_account" "kubernetes" {
  account_id = var.gke_account
}

resource "google_project_iam_member" "kubernetes" {
  project = var.gcp_project
  role = "roles/storage.admin"
  member = "serviceAccount:${google_service_account.kubernetes.email}"
}

resource "google_container_node_pool" "default" {
  name = "default"
  cluster = google_container_cluster.primary.id
  node_count = 1

  management {
    auto_repair = true
    auto_upgrade = true
  }

  node_config {
    preemptible = false
    machine_type = var.machine_type

    labels = {
      role = "general"
    }

    service_account = google_service_account.kubernetes.email

    oauth_scopes = [ "https://www.googleapis.com/auth/cloud-platform" ]
  }
}

