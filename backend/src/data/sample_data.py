"""
Sample data loader - works without Earth Engine
"""
import os
from pathlib import Path
import requests
from PIL import Image
import numpy as np

class SampleDataLoader:
    """Load sample satellite images for development"""
    
    def __init__(self, data_dir="../../data/raw"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(parents=True, exist_ok=True)
    
    def download_sample_images(self):
        """Download sample satellite images from public sources"""
        
        # Sample locations with known changes
        samples = {
            "urban_growth": {
                "location": "Dubai, UAE",
                "years": [2015, 2018, 2021, 2024],
                "description": "Rapid urban development"
            },
            "deforestation": {
                "location": "Amazon Basin",
                "years": [2015, 2018, 2021, 2024],
                "description": "Forest cover change"
            }
        }
        
        print("📦 For development, we'll use mock/sample images")
        print("You can add your own satellite images to:", self.data_dir)
        
        # Create sample structure
        for sample_name, info in samples.items():
            sample_dir = self.data_dir / sample_name
            sample_dir.mkdir(exist_ok=True)
            
            # Create placeholder for each year
            for year in info['years']:
                year_file = sample_dir / f"{year}.txt"
                year_file.write_text(f"Placeholder for {year} - {info['location']}")
        
        print("✓ Sample data structure created")
        return samples
    
    def create_mock_temporal_data(self, location_name="test_location", num_years=5):
        """
        Create mock temporal data for testing
        Returns a list of dictionaries simulating satellite images
        """
        
        temporal_data = []
        base_year = 2020
        
        for i in range(num_years):
            year = base_year + i
            
            # Mock data structure (similar to what Earth Engine would return)
            mock_image_data = {
                'year': year,
                'location': location_name,
                'satellite': 'mock_sentinel2',
                'bands': ['B4', 'B3', 'B2'],  # RGB bands
                'resolution': 10,  # meters
                'cloud_cover': np.random.uniform(5, 20),  # percentage
                # You can add actual image arrays here later
                'image_array': np.random.randint(0, 255, (256, 256, 3), dtype=np.uint8),
                'metadata': {
                    'acquisition_date': f"{year}-06-15",
                    'processing_level': 'L2A'
                }
            }
            
            temporal_data.append(mock_image_data)
        
        return temporal_data
    
    def load_user_images(self, folder_path):
        """
        Load images from a user-specified folder
        
        Args:
            folder_path: Path to folder containing images
        
        Returns:
            List of loaded images with metadata
        """
        folder = Path(folder_path)
        
        if not folder.exists():
            print(f"✗ Folder not found: {folder_path}")
            return []
        
        images = []
        
        # Load all images from folder
        for img_file in sorted(folder.glob("*.jpg")) + sorted(folder.glob("*.png")) + sorted(folder.glob("*.tif")):
            try:
                img = Image.open(img_file)
                
                # Extract year from filename if possible
                # Expected format: "2020.jpg" or "location_2020.jpg"
                filename = img_file.stem
                year = None
                for part in filename.split('_'):
                    if part.isdigit() and len(part) == 4:
                        year = int(part)
                        break
                
                images.append({
                    'filename': img_file.name,
                    'year': year,
                    'image': img,
                    'size': img.size,
                    'mode': img.mode
                })
                
                print(f"✓ Loaded: {img_file.name}")
                
            except Exception as e:
                print(f"✗ Error loading {img_file.name}: {e}")
        
        return images


# Test the sample data loader
if __name__ == "__main__":
    loader = SampleDataLoader()
    
    # Create sample structure
    samples = loader.download_sample_images()
    
    # Create mock temporal data
    print("\n📊 Creating mock temporal data...")
    mock_data = loader.create_mock_temporal_data("test_location", num_years=5)
    
    print(f"\n✓ Created {len(mock_data)} years of mock data")
    for data in mock_data:
        print(f"  - Year {data['year']}: {data['satellite']}, Cloud cover: {data['cloud_cover']:.1f}%")