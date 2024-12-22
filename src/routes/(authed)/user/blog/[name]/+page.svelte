<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms/client';
	// Ensure you have a toast library imported
	let { data } = $props();

	// Ensure data.articleForm is defined before using it
	const articleForm = superForm(data.articleForm, {
		delayMs: 2000,
		timeoutMs: 5000,
		resetForm: false,
		dataType: 'json'
	});

	let sfArticleForm = articleForm.form;
	let sfArticleFormErrors = articleForm.errors;
	let sfArticleFormEnhance = articleForm.enhance;

	let showTOC = $state(false); // State to control TOC visibility
	let submittingArticleForm = false;

	let isNewArticle = $state($sfArticleForm.name === 'new'); // State to check if the article is new
	let jsonInput = ''; // State to hold JSON input

	// Function to update the scroll progress
	function updateScrollProgress() {
		const scrollProgress = document.getElementById('scroll-progress');
		const totalHeight = document.body.scrollHeight - window.innerHeight;
		const progress = (window.scrollY / totalHeight) * 100;
		if (scrollProgress) {
			scrollProgress.style.width = `${progress}%`;
		}
	}

	// Function to handle smooth scrolling to sections
	function scrollToSection(event: Event, sectionId: string) {
		event.preventDefault();
		const sectionElement = document.getElementById(sectionId);
		if (sectionElement) {
			sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function adjustTextareaHeight(textarea: HTMLTextAreaElement) {
		textarea.style.height = 'auto'; // Reset the height
		textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
	}

	async function storeArticle() {
		if (submittingArticleForm) return;
		submittingArticleForm = true;
		$sfArticleForm.blogUrlEnding = $sfArticleForm.title.replace(/ /g, '-');
		const promise = new Promise(async (resolve, reject) => {
			await new Promise((r) => setTimeout(r, 100));
			const startTime = Date.now();
			const checkDelay = async () => {
				if (Date.now() - startTime > 5000) {
					if ($page.status === 200) {
						resolve({ success: true });
						submittingArticleForm = false;
					} else {
						reject({ success: false });
						submittingArticleForm = false;
					}
				} else {
					await new Promise((r) => setTimeout(r, 100));
					checkDelay();
				}
			};
			new Promise((r) => setTimeout(r, 2000)).then(() => {
				articleForm.submit();
			});
			await checkDelay();
		});
		toast.promise(promise, {
			loading: 'Saving article...',
			error: 'Article could not be saved',
			success: 'Article saved'
		});
	}

	async function handleFileSelect(event: Event, index: string | number) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];

			try {
				// Create FormData
				const formData = new FormData();
				formData.append('image', file);

				const fetchPromise = fetch(`/user/blog/${$sfArticleForm.name}/`, {
					method: 'POST',
					body: formData
				});
				// Show loading state
				toast.promise(fetchPromise, {
					loading: 'Bild wird hochgeladen...',
					error: 'Fehler beim Hochladen des Bildes',
					success: 'Bild erfolgreich hochgeladen'
				});

				// Upload the file
				const response = await fetchPromise;

				if (!response.ok) {
					throw new Error('Upload failed');
				}

				const data = await response.json();
				if (index === 'main') {
					$sfArticleForm.image = data.url;
					console.log('main image', data.url);
				} else if (typeof index === 'number') {
					$sfArticleForm.sections[index].imageName = data.url;
					console.log('section image', data.url);
				}
			} catch (err) {
				console.error('Error uploading image:', err);
				toast.error('Fehler beim Hochladen des Bildes');

				// Clear the file input
				input.value = '';
			}
		}
	}

	// Function to load JSON data into the form
	function loadJsonData() {
		try {
			const jsonData = JSON.parse(jsonInput);
			$sfArticleForm.name = jsonData.name || '';
			$sfArticleForm.title = jsonData.title || '';
			$sfArticleForm.blogUrlEnding = jsonData.title.replace(/ /g, '-') || '';
			$sfArticleForm.description = jsonData.description || '';
			$sfArticleForm.date = jsonData.date || '';
			$sfArticleForm.image = ''; // Set main image to empty string
			$sfArticleForm.sections = jsonData.sections.map((section: { subsections?: any[] }) => ({
				...section,
				imageName: '', // Set section imageName to empty string
				subsections: section.subsections || []
			}));
			toast.success('Data loaded successfully');
			isNewArticle = false;
		} catch (error) {
			console.error('Invalid JSON:', error);
			toast.error('Invalid JSON format');
		}
	}

	// Function to add a new section
	function addSection() {
		$sfArticleForm.sections = [
			...$sfArticleForm.sections,
			{ title: '', content: '', imageName: '', subsections: [{ title: '', content: '' }] }
		];
	}

	// Function to remove a section by index
	function removeSection(index: number) {
		$sfArticleForm.sections = $sfArticleForm.sections.filter((_, i) => i !== index);
	}

	// Function to add a new subsection to a section
	function addSubsection(sectionIndex: number) {
		const section = $sfArticleForm.sections[sectionIndex];
		if (!Array.isArray(section.subsections)) {
			section.subsections = [{ title: '', content: '' }];
		}
		$sfArticleForm.sections[sectionIndex] = {
			...section,
			subsections: [...section.subsections, { title: '', content: '' }]
		};
	}

	// Function to remove a subsection by index from a section
	function removeSubsection(sectionIndex: number, subsectionIndex: number) {
		const section = $sfArticleForm.sections[sectionIndex];
		if (!Array.isArray(section.subsections)) {
			section.subsections = [] as { title: string; content: string }[];
			return;
		}
		$sfArticleForm.sections[sectionIndex] = {
			...section,
			subsections: section.subsections.filter((_, i: number) => i !== subsectionIndex)
		};
	}

	onMount(() => {
		console.log(sfArticleForm);
		window.addEventListener('scroll', updateScrollProgress);

		// Adjust the height of textareas on mount
		const titleTextarea = document.getElementById('title') as HTMLTextAreaElement;
		const descriptionTextarea = document.getElementById('description') as HTMLTextAreaElement;
		if (titleTextarea) adjustTextareaHeight(titleTextarea);
		if (descriptionTextarea) adjustTextareaHeight(descriptionTextarea);

		return () => {
			window.removeEventListener('scroll', updateScrollProgress);
		};
	});
</script>

<div id="scroll-progress"></div>

{#if isNewArticle}
	<!-- JSON Input for new articles -->
	<textarea class="h-64 w-full" bind:value={jsonInput} placeholder="Paste JSON data here"
	></textarea>
	<button class="rounded-md bg-primary-500 px-4 py-2 text-white" onclick={loadJsonData}>
		Load Data
	</button>
{:else}
	<div class="mx-40 flex max-w-7xl flex-1">
		<form
			class="flex flex-1 flex-col"
			method="post"
			action="?/saveArticle"
			use:sfArticleFormEnhance
		>
			<!-- Article Content -->
			<div class="flex flex-1 flex-col">
				<!-- Breadcrumb Navigation -->
				<input
					type="text"
					id="name"
					class="mb-4 mt-8 w-full border-none text-2xl font-semibold focus:outline-none focus:ring-0"
					bind:value={$sfArticleForm.name}
					placeholder="Enter new name"
				/>

				<textarea
					id="title"
					class="bordered-textarea text-4xl font-bold"
					bind:value={$sfArticleForm.title}
					oninput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
				></textarea>

				<textarea
					id="description"
					class="bordered-textarea w-full"
					bind:value={$sfArticleForm.description}
					oninput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
				></textarea>

				<input type="date" id="date" class="w-full" bind:value={$sfArticleForm.date} />

				<div class="flex flex-1 flex-col sm:flex-row">
					<div class="flex flex-1 flex-col p-4">
						<div class="relative">
							<img
								class="h-[400px] w-full rounded-3xl"
								src={`${$sfArticleForm.image}`}
								alt={$sfArticleForm.title}
							/>
							<button
								class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100"
								onclick={() => {
									const mainImageInput = document.getElementById('main-image-input');
									if (mainImageInput) mainImageInput.click();
								}}
							>
								Change Image
							</button>
							<input
								type="file"
								id="main-image-input"
								class="hidden"
								onchange={(e) => handleFileSelect(e, 'main')}
							/>
						</div>

						<div class="sm:mx-16">
							{#each $sfArticleForm.sections as section, index}
								<input
									type="text"
									id={`section-title-${index}`}
									bind:value={$sfArticleForm.sections[index].title}
									placeholder="Section title"
									class="mb-4 mt-8 w-full border-none text-2xl font-semibold focus:outline-none focus:ring-0"
								/>
								<div class="relative">
									<img
										class="h-[400px] w-full rounded-3xl"
										src={`${section.imageName}`}
										alt={$sfArticleForm.sections[index]?.title}
									/>
									<button
										class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100"
										onclick={() => {
											const sectionImageInput = document.getElementById(
												`section-image-input-${index}`
											);
											if (sectionImageInput) sectionImageInput.click();
										}}
									>
										Change Image
									</button>
									<input
										type="file"
										placeholder="Section image"
										id={`section-image-input-${index}`}
										class="hidden"
										onchange={(e) => handleFileSelect(e, index)}
									/>
								</div>

								<textarea
									id={`section-content-${index}`}
									placeholder="Section content"
									class="bordered-textarea h-32 w-full"
									bind:value={$sfArticleForm.sections[index].content}
									oninput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
								></textarea>

								{#if section.subsections}
									<div class="flex flex-col">
										{#each section.subsections as subsection, subIndex}
											<input
												type="text"
												placeholder="Subsection title"
												id={`subsection-title-${index}-${subIndex}`}
												class="bordered-textarea w-full text-xl font-semibold"
												bind:value={$sfArticleForm.sections[index]!.subsections[subIndex]!.title}
											/>
											<div class="h-2"></div>
											<textarea
												id={`subsection-content-${index}-${subIndex}`}
												placeholder="Subsection content"
												class="bordered-textarea h-32 w-full"
												bind:value={$sfArticleForm.sections[index]!.subsections[subIndex]!.content}
												oninput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
											></textarea>
											<!-- Button to remove subsection -->
											<button
												class="mt-2 rounded-md bg-red-500 px-4 py-2 text-white"
												onclick={() => removeSubsection(index, subIndex)}
											>
												Remove Subsection
											</button>
										{/each}
									</div>
								{/if}
								<!-- Button to add a new subsection -->
								<button
									class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
									onclick={() => addSubsection(index)}
								>
									Add Subsection
								</button>

								<!-- Button to remove section -->
								<button
									class="mt-2 rounded-md bg-red-500 px-4 py-2 text-white"
									onclick={() => removeSection(index)}
								>
									Remove Section
								</button>
							{/each}

							<!-- Button to add a new section -->
							<button
								class="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
								onclick={addSection}
							>
								Add Section
							</button>
						</div>
					</div>
				</div>
			</div>
			<button
				type="submit"
				class="rounded-md bg-primary-500 px-4 py-2 text-white"
				onclick={(e) => {
					e.preventDefault();
					storeArticle();
				}}>Save</button
			>
		</form>
	</div>
{/if}

<style>
	#scroll-progress {
		position: fixed;
		top: 110px;
		left: 0;
		height: 4px;
		background-color: #bc6f53; /* Updated color */
		width: 0;
		z-index: 1000;
	}

	.bordered-textarea {
		border: 1px solid #ccc; /* Add a light gray border */
		border-radius: 4px; /* Optional: Add rounded corners */
		padding: 8px; /* Optional: Add some padding */
	}
</style>
