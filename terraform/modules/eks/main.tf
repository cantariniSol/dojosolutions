module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.kubernetes_version
  vpc_id          = var.vpc_id
  subnet_ids      = var.private_subnet_ids

  eks_managed_node_groups = {
    default = {
      desired_size = var.desired_size
      min_size     = var.min_size
      max_size     = var.max_size
      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
      labels = {
        workload = "dojosolutions"
      }
    }
  }

  tags = {
    Project = var.cluster_name
  }
}
