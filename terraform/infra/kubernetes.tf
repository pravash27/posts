resource "google_container_cluster" "primary" {
  name = "terraform-cluster"
  location = var.gcp_zone
  remove_default_node_pool = true
  initial_node_count = 1
  network = google_compute_network.vpc.self_link
  subnetwork = google_compute_subnetwork.subnet.self_link
  logging_service = "logging.googleapis.com/kubernetes"
  networking_mode = "VPC_NATIVE"

  addons_config {
    horizontal_pod_autoscaling {
      disabled = false
    }
  }

  release_channel {
    channel = "REGULAR"
  }

  workload_identity_config {
    workload_pool = "${var.gcp_project}.svc.id.goog"
  }

  ip_allocation_policy {
    cluster_secondary_range_name = "k8s-pod-range"
    services_secondary_range_name = "k8s-service-range"
  }

  private_cluster_config {
    enable_private_endpoint = false
    enable_private_nodes = true
    master_ipv4_cidr_block = "172.16.0.0/28"
  }
  deletion_protection = false
}