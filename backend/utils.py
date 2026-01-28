
# Simulated Model Weights and Feature Extraction Logic

def get_efficientnet_b3_weights():
    """
    Simulates EfficientNetB3 parameters. 
    EfficientNet is known for its compound scaling of depth/width/resolution.
    """
    return {
        "arch": "EfficientNet-B3",
        "layers": 28, 
        "params": "12.3M", 
        "input_resolution": 300,
        "optimization": "Skeletal-HighRes"
    }

def get_densenet_weights():
    """
    Simulates DenseNet-121 parameters.
    DenseNet is known for dense connectivity patterns that improve feature propagation.
    """
    return {
        "arch": "DenseNet-121",
        "layers": 121, 
        "params": "8.1M", 
        "input_resolution": 224,
        "optimization": "Feature-Propagation"
    }

def simulate_heatmap(image_data):
    """
    Simulates a Grad-CAM heatmap based on anatomy.
    """
    # In a real app, this would return a base64 encoded heatmap or a relative path
    return "/static/heatmap_sample.png"
