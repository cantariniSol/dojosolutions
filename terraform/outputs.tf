output "ecr_repository_url" {
  description = "URL of the application image registry."
  value       = module.ecr.repository_url
}

output "eks_cluster_name" {
  description = "Provisioned EKS cluster name."
  value       = module.eks.cluster_name
}
