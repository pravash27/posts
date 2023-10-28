resource "google_project_service" "compute" {
  service = "compute.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "container" {
  service = "container.googleapis.com"
}

resource "google_compute_network" "vpc" {
  name = "main-vpc"
  routing_mode = "REGIONAL"
  auto_create_subnetworks = false
  mtu = 1300
  
  depends_on = [ 
    google_project_service.compute,
    google_project_service.container 
    ]
}