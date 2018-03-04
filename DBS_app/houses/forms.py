from django import forms

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
	picture = forms.ImageField(widget=forms.FileInput(attrs={'class':'form-control', 'placeholder':'Upload Picture', 'style':'text-align: center;'}))