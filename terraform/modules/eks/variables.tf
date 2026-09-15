variable "cluster_name" {
  description = "EKS cluster name."
  type        = string
}

variable "kubernetes_version" {
  description = "Desired EKS cluster version."
  type        = string
}

variable "vpc_id" {
  description = "Existing AWS VPC id."
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet ids for the EKS cluster."
  type        = list(string)
}

variable "desired_size" {
  description = "Desired node group size."
  type        = number
}

variable "min_size" {
  description = "Minimum node group size."
  type        = number
}

variable "max_size" {
  description = "Maximum node group size."
  type        = number
}
