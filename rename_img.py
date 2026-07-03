import os

def rename_image(file_dir, pre_fix):
	"""
	file_dir = product images dir
	pre_fix = product brand
	"""

	files = os.listdir(file_dir)
	files = sorted(files)

	count = 0
	for f in files:
		if f == ".DS_Store":
			continue
		if pre_fix in f:
			print(f"{pre_fix} Naming Completed")
			continue

		old_name = f
		f = f.split(".")
		# Avoid multiple "." and image files in different formats.
		new_name = f"{pre_fix}_{count+1}.{f[-1]}"

		print(old_name, "->", new_name)
		old_path = os.path.join(file_dir, old_name)
		new_path = os.path.join(file_dir, new_name)

		os.rename(old_path, new_path)
		print("Naming completed")
		count += 1

	return 0

def main(brand):

	file_dir = f"./images/{brand}"
	pre_fix = brand.replace(" ", "_")

	rename_image(file_dir, pre_fix)
	return 0

if __name__ == "__main__":
	brands = [
		"NF_BODY_TOP", "Sundae_Swimwear_Collection", "Nova_set"
	]
	for brand in brands:
		main(brand)