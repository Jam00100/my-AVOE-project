import os

def rename_image(file_dir, pre_fix):

	files = os.listdir(file_dir)
	files = sorted(files)

	count = 0
	for f in files:
		if f == ".DS_Store":
			continue
		if not "_n." in f:
			print("Naming Completed")
			continue

		old_name = f
		f = f.split("_n")
		new_name = f"{pre_fix}_{count+1}{f[1]}"

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
		"𝐍𝐅 𝐁𝐎𝐃𝐘 𝐓𝐎𝐏", "Sundae Swimwear Collection"
	]
	for brand in brands:
		main(brand)