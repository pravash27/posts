resource "google_compute_address" "address" {
  name = "internal-address"
  address_type = "EXTERNAL"
  network_tier = "STANDARD"
  region = var.gcp_region

  depends_on = [ google_project_service.compute ]
}