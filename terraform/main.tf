module "ecr" {
  source          = "./modules/ecr"
  repository_name = var.project_name
}

module "eks" {
  source             = "./modules/eks"
  cluster_name       = var.project_name
  kubernetes_version = var.kubernetes_version
  vpc_id             = var.vpc_id
  private_subnet_ids = var.private_subnet_ids
  desired_size       = var.desired_size
  max_size           = var.max_size
  min_size           = var.min_size
}
